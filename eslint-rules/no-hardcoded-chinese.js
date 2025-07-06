
export const rules = {
  "no-hardcoded-chinese": {
    meta: {
      type: "problem",
      docs: {
        description: "Disallow hardcoded Chinese characters",
      },
    },
    create(context) {
      return {
        Literal(node) {
          if (typeof node.value === "string" && /[\u4e00-\u9fa5]/.test(node.value)) {
            context.report({
              node,
              message: "請勿硬編中文，請使用 i18n",
            })
          }
        },
      }
    },
  },
}