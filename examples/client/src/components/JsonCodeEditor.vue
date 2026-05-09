<script setup lang="ts">
  import { onMounted, onUnmounted, ref, watch } from 'vue';
  import { EditorState, Compartment } from '@codemirror/state';
  import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter, placeholder } from '@codemirror/view';
  import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
  import { bracketMatching, foldGutter, indentOnInput, syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
  import { autocompletion, closeBrackets, closeBracketsKeymap, snippetCompletion, type CompletionContext } from '@codemirror/autocomplete';
  import { json, jsonParseLinter } from '@codemirror/lang-json';
  import { linter, lintGutter } from '@codemirror/lint';
  import { oneDark } from '@codemirror/theme-one-dark';

  const props = withDefaults(defineProps<{
    modelValue: string;
    placeholder?: string;
  }>(), {
    placeholder: 'Paste A2UI messages JSON here',
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string];
  }>();

  const containerRef = ref<HTMLDivElement | null>(null);
  const editorReady = ref(false);
  let view: EditorView | null = null;
  const placeholderCompartment = new Compartment();

  const completionOptions = [
    snippetCompletion(`[
  {
    "version": "v0.9",
    "createSurface": {
      "surfaceId": "\${surfaceId}",
      "catalogId": "urn:a2ui:catalog:vant:v1",
      "sendDataModel": true
    }
  },
  {
    "version": "v0.9",
    "updateComponents": {
      "surfaceId": "\${surfaceId}",
      "components": []
    }
  },
  {
    "version": "v0.9",
    "updateDataModel": {
      "surfaceId": "\${surfaceId}",
      "value": {}
    }
  }
]`, {
      label: 'messages skeleton',
      type: 'snippet',
      detail: 'Full A2UI messages array',
    }),
    snippetCompletion(`{
  "version": "v0.9",
  "createSurface": {
    "surfaceId": "\${surfaceId}",
    "catalogId": "urn:a2ui:catalog:vant:v1",
    "sendDataModel": true
  }
}`, {
      label: 'createSurface',
      type: 'snippet',
    }),
    snippetCompletion(`{
  "version": "v0.9",
  "updateComponents": {
    "surfaceId": "\${surfaceId}",
    "components": [
      {
        "id": "root",
        "component": "Column",
        "children": []
      }
    ]
  }
}`, {
      label: 'updateComponents',
      type: 'snippet',
    }),
    snippetCompletion(`{
  "version": "v0.9",
  "updateDataModel": {
    "surfaceId": "\${surfaceId}",
    "value": {}
  }
}`, {
      label: 'updateDataModel',
      type: 'snippet',
    }),
    ...[
      'version',
      'createSurface',
      'updateComponents',
      'updateDataModel',
      'surfaceId',
      'catalogId',
      'component',
      'children',
      'child',
      'path',
      'componentId',
      'action',
      'event',
      'context',
      'style',
      'theme',
      'variant',
      'text',
      'label',
      'value',
    ].map((label) => ({
      label: `"${label}"`,
      type: 'property' as const,
    })),
    ...[
      'Column',
      'Row',
      'List',
      'Card',
      'Text',
      'Button',
      'TextField',
      'ChoicePicker',
      'Slider',
      'CheckBox',
      'DateTimeInput',
      'Tabs',
      'Modal',
      'Divider',
      'Image',
      'Icon',
      'Tag',
      'CellGroup',
    ].map((label) => ({
      label,
      type: 'text' as const,
      detail: 'Component name',
    })),
  ];

  const completionSource = (context: CompletionContext) => {
    const word = context.matchBefore(/[\w"\/.-]*/);
    if (!context.explicit && (!word || word.from === word.to)) {
      return null;
    }

    return {
      from: word ? word.from : context.pos,
      options: completionOptions,
    };
  };

  const editorTheme = EditorView.theme({
    '&': {
      height: '100%',
      minHeight: '620px',
      fontSize: '13px',
    },
    '.cm-scroller': {
      overflow: 'auto',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
    '.cm-content': {
      padding: '12px 0',
    },
    '.cm-gutters': {
      backgroundColor: '#1f2430',
      color: '#7c8799',
      border: 'none',
    },
    '.cm-activeLine': {
      backgroundColor: 'rgba(148, 163, 184, 0.08)',
    },
    '.cm-activeLineGutter': {
      backgroundColor: 'rgba(148, 163, 184, 0.08)',
    },
    '.cm-tooltip-autocomplete': {
      borderRadius: '12px',
      overflow: 'hidden',
    },
    '.cm-placeholder': {
      color: '#64748b',
    },
  });

  const createEditor = () => {
    if (!containerRef.value) return;

    view = new EditorView({
      parent: containerRef.value,
      state: EditorState.create({
        doc: props.modelValue,
        extensions: [
          lineNumbers(),
          highlightActiveLineGutter(),
          highlightActiveLine(),
          history(),
          foldGutter(),
          indentOnInput(),
          bracketMatching(),
          closeBrackets(),
          EditorState.tabSize.of(2),
          EditorView.lineWrapping,
          json(),
          syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
          oneDark,
          lintGutter(),
          linter(jsonParseLinter()),
          autocompletion({
            override: [completionSource],
            activateOnTyping: true,
          }),
          keymap.of([
            indentWithTab,
            ...defaultKeymap,
            ...historyKeymap,
            ...closeBracketsKeymap,
          ]),
          placeholderCompartment.of(placeholder(props.placeholder)),
          editorTheme,
          EditorView.updateListener.of((update) => {
            if (!update.docChanged) return;
            const nextValue = update.state.doc.toString();
            if (nextValue !== props.modelValue) {
              emit('update:modelValue', nextValue);
            }
          }),
        ],
      }),
    });

    editorReady.value = true;
  };

  onMounted(() => {
    createEditor();
  });

  onUnmounted(() => {
    view?.destroy();
    view = null;
  });

  watch(
    () => props.modelValue,
    (nextValue) => {
      if (!view) return;
      const currentValue = view.state.doc.toString();
      if (nextValue === currentValue) return;

      view.dispatch({
        changes: {
          from: 0,
          to: currentValue.length,
          insert: nextValue,
        },
      });
    },
  );

  watch(
    () => props.placeholder,
    (nextPlaceholder) => {
      if (!view) return;
      view.dispatch({
        effects: placeholderCompartment.reconfigure(placeholder(nextPlaceholder)),
      });
    },
  );
</script>

<template>
  <div class="json-editor">
    <div
      v-if="!editorReady"
      class="json-editor-loading"
    >
      正在初始化编辑器...
    </div>
    <div
      ref="containerRef"
      class="json-editor-host"
    />
  </div>
</template>

<style scoped>
  .json-editor {
    position: relative;
    min-height: 620px;
    height: 100%;
    border: 1px solid rgba(15, 23, 42, 0.14);
    border-radius: 18px;
    overflow: hidden;
    background: #282c34;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }

  .json-editor-host {
    min-height: 620px;
    height: 100%;
  }

  .json-editor-loading {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #cbd5e1;
    font-size: 13px;
    pointer-events: none;
    z-index: 1;
    background: rgba(15, 23, 42, 0.2);
  }
</style>
