'use client'

import { Toast } from '@base-ui/react/toast'

export const toast = Toast.createToastManager()

function ToastList() {
  const { toasts } = Toast.useToastManager()

  return toasts.map((item) => (
    <Toast.Root
      key={item.id}
      toast={item}
      className={`absolute inset-e-0 bottom-0 flex w-full items-center gap-3 rounded-full border-[3px] border-ink px-5.5 py-3.5 font-body text-surface shadow-[5px_5px_0] transition-transform duration-350 ease-[cubic-bezier(.2,1.3,.4,1)] data-ending-style:translate-y-[140%] data-starting-style:translate-y-[140%] ${
        item.type === 'error' ? 'bg-red shadow-ink' : 'bg-ink shadow-red'
      }`}
    >
      <Toast.Content className="flex w-full items-center gap-3">
        <span
          aria-hidden="true"
          className={`grid size-7 shrink-0 place-items-center rounded-full font-bold leading-none text-ink ${
            item.type === 'error' ? 'bg-surface' : 'bg-gold'
          }`}
        >
          {item.type === 'loading' ? (
            <span className="size-3.5 animate-[spin_0.8s_linear_infinite] rounded-full border-2 border-ink border-t-transparent" />
          ) : item.type === 'error' ? (
            '×'
          ) : (
            '✓'
          )}
        </span>
        <div className="min-w-0 flex-1">
          <Toast.Title className="text-sm font-extrabold" />
          <Toast.Description className="mt-1 text-sm font-medium text-surface/80" />
        </div>
        <Toast.Close className="sr-only focus:not-sr-only focus:absolute focus:inset-e-3 focus:rounded-full focus:bg-surface focus:px-2 focus:text-xs focus:font-bold focus:text-ink">
          Dismiss notification
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ))
}

export function Toaster() {
  return (
    <Toast.Provider toastManager={toast} timeout={4000} limit={3}>
      <Toast.Portal>
        <Toast.Viewport
          className="fixed inset-x-0 bottom-7 z-50 mx-auto h-40 w-[min(460px,92vw)]"
          dir="ltr"
        >
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  )
}
