import type { AllowedComponentProps, Component, VNodeProps } from 'vue'

type UserDefinedProps<C extends new (...args: unknown[]) => unknown> = Omit<
  InstanceType<C> extends { $props: infer P } ? P : never,
  keyof VNodeProps | keyof AllowedComponentProps
>

export type ComponentProps<C extends Component> = C extends new (...args: unknown[]) => unknown
  ? UserDefinedProps<C> & {
      -readonly [K in keyof UserDefinedProps<C>]: UserDefinedProps<C>[K]
    }
  : never
