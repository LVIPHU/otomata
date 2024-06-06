import { motion, Variants } from 'framer-motion'

export default function LoadingTemplates() {
  return (
    <div
      className={'absolute top-0 left-0 bottom-0 right-0 z-20 h-[100vh] w-[100vw] grid place-content-center'}
      style={{
        background: 'rgba(255, 255, 255, 0.5)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <BarLoader />
    </div>
  )
}

const variants: Variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: 'mirror',
      duration: 1,
      ease: 'circIn'
    }
  }
}

const BarLoader = () => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25
      }}
      initial='initial'
      animate='animate'
      className='flex gap-1'
    >
      <motion.div variants={variants} className='h-12 w-2 bg-primary' />
      <motion.div variants={variants} className='h-12 w-2 bg-primary' />
      <motion.div variants={variants} className='h-12 w-2 bg-primary' />
      <motion.div variants={variants} className='h-12 w-2 bg-primary' />
      <motion.div variants={variants} className='h-12 w-2 bg-primary' />
    </motion.div>
  )
}
