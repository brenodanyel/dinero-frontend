import ui from '@nuxt/ui/vite'

export default () =>
  ui({
    // colorMode: false,
    ui: {
      icons: {
        arrowLeft: 'i-lucide-arrow-left',
        arrowRight: 'i-lucide-arrow-right',
        check: 'i-lucide-check',
        chevronDoubleLeft: 'i-lucide-chevrons-left',
        chevronDoubleRight: 'i-lucide-chevrons-right',
        chevronDown: 'i-lucide-chevron-down',
        chevronLeft: 'i-lucide-chevron-left',
        chevronRight: 'i-lucide-chevron-right',
        chevronUp: 'i-lucide-chevron-up',
        close: 'i-lucide-x',
        ellipsis: 'i-lucide-ellipsis',
        external: 'i-lucide-arrow-up-right',
        loading: 'i-lucide-loader-2',
        minus: 'i-lucide-minus',
        plus: 'i-lucide-plus',
        search: 'i-lucide-search',
      },
      modal: {
        slots: {
          overlay: 'bg-black/75',
          footer: 'justify-center',
          close: 'size-8',
        },
      },
      button: {
        slots: {
          base: 'rounded-full',
        },
        variants: {
          variant: {
            outline: 'outline-1',
          },
        },
      },
      select: {
        slots: {
          base: 'w-full rounded-full',
          trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
        },
        variants: {
          variant: {
            outline: '',
          },
        },
      },
      selectMenu: {
        slots: {
          base: 'w-full rounded-full',
          trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
        },
        variants: {
          variant: {
            outline: '',
          },
        },
      },
      input: {
        slots: {
          root: 'w-full',
        },
      },
      inputNumber: {
        slots: {
          root: 'w-full',
        },
      },
      card: {
        slots: {
          root: '',
          footer: 'flex items-center justify-center',
        },
      },
      tooltip: {
        slots: {
          content: 'bg-[var(--ui-bg-elevated)] h-auto',
        },
      },
    },
  })
