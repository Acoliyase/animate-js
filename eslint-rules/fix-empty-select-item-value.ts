import type { Rule } from 'eslint';
import type { JSXElement, JSXAttribute, Literal } from 'estree-jsx';

/**
 * ESLint rule to fix empty string values in SelectItem components.
 * Automatically replaces empty value attributes with "all".
 *
 * @example
 * ✗ Bad: <SelectItem value="" />
 * ✓ Good: <SelectItem value="all" />
 *
 * @see https://github.com/Acoliyase/animate-js/blob/main/eslint-rules/fix-empty-select-item-value.ts
 */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Fix empty string values in SelectItem components',
      category: 'Possible Errors',
      url: 'https://github.com/Acoliyase/animate-js/blob/main/eslint-rules/fix-empty-select-item-value.ts',
    },
    fixable: 'code',
    schema: [],
    messages: {
      emptyValue:
        'SelectItem value cannot be empty. This will be auto-fixed to "all". ' +
        'Please provide a meaningful value for accessibility and functionality.',
    },
  },

  create(context: Rule.RuleContext): Rule.RuleListener {
    return {
      JSXElement(node: JSXElement) {
        const { openingElement } = node;

        // Check if this is a SelectItem component
        if (
          openingElement.name?.type !== 'JSXIdentifier' ||
          openingElement.name.name !== 'SelectItem'
        ) {
          return;
        }

        // Find the value attribute
        const valueAttr = openingElement.attributes.find(
          (attr: any): attr is JSXAttribute =>
            attr.type === 'JSXAttribute' &&
            attr.name?.type === 'JSXIdentifier' &&
            attr.name.name === 'value',
        );

        // Skip if no value attribute found
        if (!valueAttr?.value) {
          return;
        }

        // Check if the value is an empty string literal
        const isEmptyString =
          valueAttr.value.type === 'Literal' &&
          (valueAttr.value as Literal).value === '';

        // Report and auto-fix empty string values
        if (isEmptyString) {
          context.report({
            node: valueAttr.value,
            messageId: 'emptyValue',
            fix: (fixer) => fixer.replaceText(valueAttr.value!, '"all"'),
          });
        }
      },
    };
  },
} as Rule.RuleModule;
