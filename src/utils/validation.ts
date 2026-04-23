export function getValidationMessage(checks: any[], value: any): string {
  if (!Array.isArray(checks)) return '';

  for (const check of checks) {
    if (check === 'required' || check?.type === 'required' || check?.name === 'required') {
      if (!value) return check?.message || 'Field is required';
      continue;
    }

    if (check?.regex || check?.type === 'regex') {
      const pattern = check.regex || check.pattern;
      if (pattern && !new RegExp(pattern).test(String(value ?? ''))) {
        return check?.message || 'Invalid format';
      }
    }

    if (check?.type === 'minLength' && check.value !== undefined) {
      if (String(value ?? '').length < check.value) {
        return check?.message || `Minimum length is ${check.value}`;
      }
    }

    if (check?.type === 'maxLength' && check.value !== undefined) {
      if (String(value ?? '').length > check.value) {
        return check?.message || `Maximum length is ${check.value}`;
      }
    }
  }

  return '';
}
