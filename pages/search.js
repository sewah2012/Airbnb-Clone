import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { useRouter } from 'next/dist/client/router'
import { format } from 'date-fns'
import InfoCard from '../Components/InfoCard'

const Search = ({ searchResult }) => {
  const router = useRouter()
  const { location, startDate, endDate, numberOfGuest } = router.query

  const formatedStartDate = format(new Date(startDate), 'dd MMMM yy')
  const formatedEndDate = format(new Date(endDate), 'dd MMMM yy')

  const range = `${formatedStartDate} - ${formatedEndDate}`
  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${numberOfGuest}`} />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ stays - {range} - for {numberOfGuest} guest(s)
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>

          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation flexibility</p>
            <p className="button">Type of Price</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More Filters</p>
          </div>

          {/* search results  */}
          <div className="flex flex-col">
            {searchResult.map((item, index) => (
              <InfoCard
                key={index}
                img={item.img}
                location={item.location}
                description={item.description}
                title={item.title}
                star={item.star}
                price={item.price}
                total={item.total}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Search

export async function getServerSideProps() {
  const searchResult = await fetch(
    'https://links.papareact.com/isz',
  ).then((res) => res.json())

  return {
    props: {
      searchResult,
    },
  }
}
