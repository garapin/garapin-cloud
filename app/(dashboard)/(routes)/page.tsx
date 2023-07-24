import { DownloadIconSVG } from '@/app/assets/icons/DownloadIcon'
import Image from 'next/image'
import { IoMdStar } from 'react-icons/io'
import { FaPlay } from 'react-icons/fa'

export default function Home() {
  return (
    <main className='space-y-10'>
      <section className="bg-[#344289] rounded-[24px] flex gap-6 items-center text-white py-4 px-6">
        <Image
          alt="garapin-cloud"
          src="/images/inventory-system.png"
          className='w-[400px]'
          width={400}
          height={400}
        />
        <div className='flex flex-col justify-between h-full'>
          <h2 className='text-3xl mb-2'>INVENTORY SYSTEM</h2>
          <p className='text-xl font-light pr-4 mb-14'>Butuh Inventory system untuk kontrol stok kamu di market-place seperti Tokopedia, Shopee dan Lazada? Cari Aplikasi Inventory Kamu di Marketplace Kami,  Dan mulai kontrol inventory Kamu.</p>
          <div className="flex items-center justify-end pr-4">
            <button className='flex items-center gap-2 bg-[#223CFF] hover:bg-[#223CFF]/80 px-4 py-2 rounded-md'>
              <DownloadIconSVG className="w-6 h-6" />
              <span>Install Now</span>
            </button>
          </div>
        </div>
      </section>
      <section>
        <h2 className='text-2xl mb-4'>Installed Apps</h2>
        <div className="grid grid-cols-12 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
            <div className="col-span-3 bg-white p-4 rounded-2xl">
              <Image
                alt="apps"
                src="/images/apps-img.png"
                className='w-full mb-2'
                width={400}
                height={400}
              />
              <div className="content">
                <p className='mb-1'>Installed</p>
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
                  <button className='flex items-center gap-2 bg-green-500 px-4 py-2 rounded-md text-white'>
                    <FaPlay className='w-6 h-6 text-white' />
                    <span>Launch</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
