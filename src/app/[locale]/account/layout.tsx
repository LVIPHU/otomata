import { ReactNode } from 'react'
import Sidebar from '@/components/organisms/sidebar'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/atoms/resizable'

export default async function AccountLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className={'flex flex-col gap-8'}>
      <div>
        <header className={'container-content'}>
          <div className={'flex items-center my-6 md:my-10'}>
            <h1 className={'font-bold text-3xl'}>Account Settings</h1>
          </div>
        </header>
      </div>
      <div>
        <main className={'container-content'}>
          <ResizablePanelGroup direction='horizontal'>
            <ResizablePanel defaultSize={25} className={'mr-6'}>
              <Sidebar />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel className={'ml-6'}>{children}</ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </div>
    </div>
  )
}
