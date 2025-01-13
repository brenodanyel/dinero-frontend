type ExpenseCategories = Record<
  string,
  {
    icon: string
  }
>

export const expenseCategoriesSettings: ExpenseCategories = {
  Alimentação: {
    icon: 'i-mdi-food-outline',
  },
  Educação: {
    icon: 'i-mdi-education-outline',
  },
  Lazer: {
    icon: 'i-mdi-emoticon-happy-outline',
  },
  Moradia: {
    icon: 'i-mdi-house-outline',
  },
  Saúde: {
    icon: 'i-mdi-heart-outline',
  },
  Transporte: {
    icon: 'i-mdi-car-outline',
  },
  Outros: {
    icon: 'i-mdi-dots-horizontal',
  },
}
