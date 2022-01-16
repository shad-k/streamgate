import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="hero bg-gradient-to-br from-primary to-secondary p-10">
        <div className="hero-overlay rounded-box py-10 opacity-40"></div>
        <div className="hero-content flex-col mx-8 rounded-box py-10">
          <h1 className="text-4xl">Streamgate</h1>
          <p className="text-xl">Add token-gated live streams to any webpage</p>
          <Link href="/create">
            <a>
              <button className="btn btn-primary btn-lg">Create a Live stream</button>
            </a>
          </Link>
        </div>
      </div>
      <div className="card bg-primary-content hover:bg-primary-content hover:bg-opacity-90 bg-opacity-90 glass p-4 text-primary-content text-center text-lg text-white rounded-none">
        <div className="card-body flex-col h-96 justify-between">
          <span className="text-xl">
            <strong>Streamgate</strong> gives anyone the ability to add live streams to their webpages and configuring
            access control conditions by following simple steps:
          </span>
          <ol className="list-decimal list-inside">
            <li>Submit your Livepeer.com API key</li>
            <li>Configure access control</li>
            <li>Add a name for your stream, if you want, and click Create</li>
            <li>Copy the code snippet to paste in your webpage or simply share the stream URL with your viewers</li>
          </ol>
          <span>Powered by Livepeer.com, Lit Protocol and IPFS</span>
        </div>
      </div>
    </>
  );
}
