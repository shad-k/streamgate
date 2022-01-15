import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from 'lit-jwt-verifier';

const streamMiddleware = async (req) => {
  const playbackId = req.page.params?.playbackId;
  const jwt = req.nextUrl.searchParams.get('jwt');

  if (jwt) {
    const { payload, verified } = await verifyJwt({ jwt });
    if (verified && payload.path === `/stream/${playbackId}`) {
      return NextResponse.rewrite(`/stream/${playbackId}`);
    }
  }
  return new Response(JSON.stringify({ error: "You don't meet the access criteria" }), {
    status: 401,
    statusText: 'Unauthorized',
  });
};

const authMiddleware = async (req) => {
  const cid = req.page.params.cid;

  const redirectURL = `/connect-wallet/${cid}`;
  const res = NextResponse.redirect(redirectURL);
  return res;
};

const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  const requestURL = req.nextUrl.pathname;
  if (requestURL.startsWith('/stream')) {
    return await streamMiddleware(req);
  }
  if (requestURL.startsWith('/auth')) {
    return await authMiddleware(req);
  }
  return NextResponse.next();
};

export default middleware;
