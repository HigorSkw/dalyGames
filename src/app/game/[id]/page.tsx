import { allGames, gameSorted } from '@/utils/database';
import { IGameProps } from '@/utils/types/game';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import Container from '@/components/Container';
import { Label } from './components/label';
import { GameCard } from '@/components/GameCard';
import { Metadata } from 'next';

export async function generateMetaData({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const response: IGameProps = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&=${params.id}`,
      { cache: 'no-store' },
    )
      .then((res) => res.json())
      .catch(() => {
        return {
          title: 'DalyGames - Descubra jogos incríves para se divertir',
        };
      });

    return {
      title: response.title,
      description: `${response.description.slice(0, 100)}...`,
      openGraph: {
        title: response.title,
        images: [response.image_url],
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true,
        },
      },
    };
  } catch (error) {
    return {
      title: 'DalyGames - Descubra jogos incríves para se divertir',
    };
  }
}

async function getData(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&=${id}`,
      { cache: 'no-store' },
    );

    return res.json();
  } catch (error) {
    const allGamesData: IGameProps[] = allGames;

    const gameDetail = allGamesData.find((elem) => elem.id == Number(id));

    return gameDetail;
  }
}

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

async function getGameSorted() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { cache: 'no-store' },
    );

    return res.json();
  } catch (error) {
    return gameSorted;
  }
}

export default async function GameDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const data: IGameProps = await getData(id);
  const sortedGame: IGameProps = await getGameSorted();

  if (!data) redirect('/');

  return (
    <main className="w-full text-black">
      <div className="bg-black h-80 w-full sm:h-96 relative">
        <Image
          src={data.image_url}
          alt={data.title}
          quality={100}
          priority
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
          className="object-cover w-full h-80 sm:h-96 opacity-80 transition-all duration-300"
        />
      </div>

      <Container>
        <h1 className="font-bold text-xl my-4">{data.title}</h1>
        <p> {data.description}</p>

        <h2 className="font-bold text-lg mt-7 mb-2">Plataformas</h2>
        <div className="flex gap-2 flex-wrap">
          {data.platforms.map((item) => (
            <Label key={item} name={item} />
          ))}
        </div>

        <p> {data.description}</p>

        <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
        <div className="flex gap-2 flex-wrap">
          {data.categories.map((item) => (
            <Label key={item} name={item} />
          ))}
        </div>

        <p className="mt-7 mb-2">
          <strong>Data de Lançamento:</strong> {data.release}
        </p>

        <h2 className="font-bold text-lg mt-7 mb-2">Jogo recomendado:</h2>
        <div className="flex">
          <div className="flex-grow">
            <GameCard data={sortedGame} />
          </div>
        </div>
      </Container>
    </main>
  );
}
