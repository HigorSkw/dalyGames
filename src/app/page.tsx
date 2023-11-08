import Container from '@/components/Container';
import { IGameProps } from '@/utils/types/game';
import Link from 'next/link';
import Image from 'next/image';
import { BsArrowRightSquare } from 'react-icons/bs';
import Input from '@/components/Input';
import { allGames } from '@/utils/database';
import { GameCard } from '@/components/GameCard';

let objectRes = {
  id: 10,
  title: 'Fortnite',
  description:
    'Fortnite é um jogo de batalha real desenvolvido pela Epic Games. Nele, os jogadores competem uns contra os outros em uma ilha enquanto constroem estruturas e procuram armas para sobreviver. Com uma mecânica única de construção, visuais coloridos e eventos sazonais emocionantes, Fortnite se tornou uma sensação global e é um dos jogos mais populares do gênero.',
  image_url: 'https://sujeitoprogramador.com/next-api/foto10.png',
  platforms: ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch'],
  categories: ['Battle Royale', 'Tiro', 'Construção'],
  release: '25/07/2017',
};

async function getDalyGame() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { next: { revalidate: 320 } },
    );

    return res.json();
  } catch (error) {
    return objectRes;
  }
}

async function getGameData() {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=games`, {
      next: { revalidate: 320 },
    });

    return res.json();
  } catch (error) {
    return allGames;
  }
}

export default async function Home() {
  const dalyGame: IGameProps = await getDalyGame();
  const data: IGameProps[] = await getGameData();

  return (
    <main className="w-full">
      <Container>
        <h1 className="text-center font-bold text-x1 mt-8 mb-5">
          Separamos um jogo exclusivo para você
        </h1>
        <Link href={`/game/${dalyGame.id}`}>
          <section className="w-full bg-black rounded-lg ">
            <div className="w-full max-h-96 h-96 relative rounded-lg">
              <div className="absolute z-20 bottom-0 p-3 justify-center items-center gap-2">
                <p className="font-bold text-xl text-white">
                  {dalyGame.title}
                  <BsArrowRightSquare size={24} color="#fff" />
                </p>
              </div>
              <Image
                src={dalyGame.image_url}
                alt={dalyGame.title}
                quality={100}
                priority
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                className="max-h-96 object-cover rounded-lg opacity-50 hover:opacity-100 transition-all duration-300"
              />
            </div>
          </section>
        </Link>

        <Input />

        <h2 className="text-lg font-bold -mt-8 mb-5">Jogos para conhecer</h2>
        <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((item) => (
            <GameCard key={item.id} data={item} />
          ))}
        </section>
      </Container>
    </main>
  );
}
