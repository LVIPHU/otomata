import Image from 'next/image'
interface Props {
  className?: string
}

export default function Logo({ className }: Props) {
  return (
    <div className={className}>
      <Image className={'block dark:hidden'} alt={`logo-light`} width={60} height={60} src={`/images/logo/light.svg`} />
      <Image className={'dark:block hidden'} alt={`logo-dark`} width={60} height={60} src={`/images/logo/dark.svg`} />
    </div>
  )
}
