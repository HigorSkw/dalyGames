import Container from '@/components/container';
import { IGameProps } from '@/utils/types/game';
import Link from 'next/link';
import Image from 'next/image';

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
    );

    return res.json();
  } catch (error) {
    console.log();
    return objectRes;
  }
}

export default async function Home() {
  const dalyGame: IGameProps = await getDalyGame();

  console.log(dalyGame);

  return (
    <main className="w-full">
      <Container>
        <h1 className="text-center font-bold text-x1 mt-8 mb-5">
          Separamos um jogo exclusivo para você
        </h1>
        <Link href={`/game/${dalyGame.id}`}>
          <section className="w-full bg-black rounded-lg ">
            <Image
              src={dalyGame.image_url}
              alt={dalyGame.title}
              priority
              quality={100}
              width={100}
              height={100}
            />
          </section>
        </Link>
      </Container>
    </main>
  );
}
