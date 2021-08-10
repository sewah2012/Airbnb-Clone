import Image from 'next/image'
import {
  SearchIcon,
  GlobeAltIcon,
  UnderCircleIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/solid'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRangePicker } from 'react-date-range'
import { useState } from 'react'
import { useRouter } from 'next/dist/client/router'

const Header = ({ placeholder }) => {
  const router = useRouter()
  const [searchInput, setsearchInput] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [numberOfGuest, setNumberOfGuest] = useState(1)
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }

  const handleSelectDate = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }
  const handleChange = (e) => {
    setsearchInput(e.target.value)
  }

  // cancel and delete functions
  const resetInput = () => {
    setsearchInput('')
  }

  const searchBtn = ({ placeholder }) => {
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfGuest,
      },
    })

    setsearchInput('')
  }
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      {/* left */}
      <div
        onClick={() => router.push('/')}
        className="relative flex items-center h-10 cursor-pointer my-auto "
      >
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* middle (search section) */}
      <div
        className="
	  	flex items-center 
		  md:border-2 rounded-full py-2
		  md:shadow-sm"
      >
        <input
          onChange={handleChange}
          value={searchInput}
          type="text"
          placeholder={placeholder || 'Start your search'}
          className="pl-5 bg-transparent 
		  outline-none flex-grow 
		  text-sm 
		  text-gray-400 placeholder-gray-400
		  "
        />
        <SearchIcon
          className="
                hidden 
                md:inline-flex 
                h-8 
                bg-red-400
                text-white rounded-full cursor-pointer p-2
                md:mx-2"
        />
      </div>

      {/* right */}
      <div
        className="flex space-x-4 items-center justify-end
	  text-gray-500"
      >
        {' '}
        <p className="hidden md:inline cursor-pointer">Become a Host</p>
        <GlobeAltIcon className="h-6 " />
        <div
          className="
		flex items-center space-x-2 
		border-2 p-2 rounded-full"
        >
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>

      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#FD5b61']}
            onChange={handleSelectDate}
          />

          <div className="flex items-center border-b-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              value={numberOfGuest}
              onChange={(e) => setNumberOfGuest(e.target.value)}
              type="number"
              min={1}
              className="w-12 pl-2 text-lg text-red-400 outline-none"
            />
          </div>
          <div className="flex col-span-3">
            <button onClick={resetInput} className="flex-grow text-gray-500 ">
              Cancel
            </button>
            <button onClick={searchBtn} className="flex-grow text-red-400">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
