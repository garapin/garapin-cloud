import Image from 'next/image'
import { IoMdStar } from 'react-icons/io'
import { BillingIconSVG } from '@/app/assets/icons/BillingIcon'

export default function Billing() {
  return (
    <main className='space-y-10'>
      <section>
        <h2 className='text-2xl mb-4'>Due Date</h2>
        <div className="grid grid-cols-12 gap-4">
          {[1, 2, 3, 4].map(item => (
            <div className="col-span-3 bg-white p-4 rounded-2xl">
              <Image
                alt="apps"
                src="/images/apps-img.png"
                className='w-full mb-2'
                width={400}
                height={400}
              />
              <div className="content">
                <p className='mb-1 text-green-500'>ACTIVE</p>
                <p className='text-xl mb-2'>Inventory System</p>
                <div className="rating flex gap-2 mb-1">
                  <span className='text-sm text-yellow-400'>4.3</span>
                  <div className="flex items-center gap-1">
                    <IoMdStar className='text-yellow-400' />
                    <IoMdStar className='text-yellow-400' />
                    <IoMdStar className='text-yellow-400' />
                    <IoMdStar className='text-yellow-400' />
                    <IoMdStar className='text-yellow-400' />
                  </div>
                  <span className='text-slate-500 text-sm'>(16,325)</span>
                </div>
                <p>Next Billing</p>
                <p className='text-slate-500 text-sm'>
                  <span className='text-blue-500'>Rp. 125.000 </span>
                  on 24-Mei-2023
                </p>

                <div className="action mt-2">
                  <button className='flex items-center gap-2 bg-[#223CFF] hover:bg-[#223CFF]/80 px-4 py-2 rounded-md text-white'>
                    <BillingIconSVG className='w-6 h-6 text-white' />
                    <span>Pay Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className='text-2xl mb-4'>Overdue</h2>
        <div className="grid grid-cols-12 gap-4">
          {[1, 2, 3, 4].map(item => (
            <div className="col-span-3 bg-white p-4 rounded-2xl">
              <Image
                alt="apps"
                src="/images/apps-img.png"
                className='w-full mb-2'
                width={400}
                height={400}
              />
              <div className="content">
                <p className='mb-1 text-red-500'>STOP - Delete on 30-Mei-2023</p>
                <p className='text-xl mb-2'>Inventory System</p>
                <div className="rating flex gap-2 mb-1">
                  <span className='text-sm text-yellow-400'>4.3</span>
                  <div className="flex items-center gap-1">
                    <IoMdStar className='text-yellow-400' />
                    <IoMdStar className='text-yellow-400' />
                    <IoMdStar className='text-yellow-400' />
                    <IoMdStar className='text-yellow-400' />
                    <IoMdStar className='text-yellow-400' />
                  </div>
                  <span className='text-slate-500 text-sm'>(16,325)</span>
                </div>
                <p>Next Billing</p>
                <p className='text-slate-500 text-sm'>
                  <span className='text-blue-500'>Rp. 125.000 </span>
                  on 24-Mei-2023
                </p>

                <div className="action mt-2">
                  <button className='flex items-center gap-2 bg-[#223CFF] hover:bg-[#223CFF]/80 px-4 py-2 rounded-md text-white'>
                    <BillingIconSVG className='w-6 h-6 text-white' />
                    <span>Launch</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className='text-2xl mb-4'>Deleted</h2>
        <div className="grid grid-cols-12 gap-4">
          {[1, 2].map(item => (
            <div className="col-span-3 bg-white p-4 rounded-2xl">
              <Image
                alt="apps"
                src="/images/apps-img.png"
                className='w-full mb-2'
                width={400}
                height={400}
              />
              <div className="content">
                <p className='mb-1 text-red-500'>Deleted on 30-Mei-2023</p>
                <p className='text-xl mb-2'>Inventory System</p>
                <div className="rating flex gap-2 mb-1">
                  <span className='text-sm text-yellow-400'>4.3</span>
                  <div className="flex items-center gap-1">
                    <IoMdStar className='text-yellow-400' />
                    <IoMdStar className='text-yellow-400' />
                    <IoMdStar className='text-yellow-400' />
                    <IoMdStar className='text-yellow-400' />
                    <IoMdStar className='text-yellow-400' />
                  </div>
                  <span className='text-slate-500 text-sm'>(16,325)</span>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}