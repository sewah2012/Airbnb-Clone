import Head from 'next/head'
import Header from '../Components/Header'
import Banner from '../Components/Banner'
import SmallCards from '../Components/SmallCards'
import MediumCard from '../Components/MediumCard'
import BigCards from '../Components/BigCards'
import Footer from '../Components/Footer'

export default function Home({ explorerData, cardsData }) {
  return (
    <div className="">
      <Head>
        <title>AirbnB Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />
      {/*main section*/}

      <main className="max-w-7xl mx-auto sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

          {/* pull some data from api end point */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {explorerData?.map((item, index) => (
              <SmallCards
                key={index}
                img={item.img}
                location={item.location}
                distance={item.distance}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>

          <div
            className="
          flex space-x-3 overflow-scroll scrollbar-hide
          p-3 -ml-3
          "
          >
            {cardsData?.map((item, index) => (
              <MediumCard key={index} img={item.img} title={item.title} />
            ))}
          </div>
        </section>

        <section>
          <BigCards
            img="https://links.papareact.com/4cj"
            title="The Greatest Outdoors"
            description="Wishlist created by Airbnb"
            buttonText="Get Inspired"
          />
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const explorerData = await fetch(
    'https://links.papareact.com/pyp',
  ).then((res) => res.json())

  const cardsData = await fetch('https://links.papareact.com/zp1').then((res) =>
    res.json(),
  )

  return {
    props: {
      explorerData,
      cardsData,
    },
  }
}
