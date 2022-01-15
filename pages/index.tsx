import Link from 'next/link';

export default function Home() {
  return (
    <div className="hero bg-gradient-to-br from-primary to-secondary p-10">
      <div className="hero-overlay rounded-box py-10 opacity-40"></div>
      <div className="hero-content flex-col mx-8 rounded-box py-10">
        <h1 className="text-4xl">Streamgate</h1>
        <p className="text-xl">Add token-gated live streams to any website</p>
        <Link href="/create">
          <a>
            <button className="btn btn-primary btn-lg">Create a Live stream</button>
          </a>
        </Link>
      </div>
    </div>
  );
}
