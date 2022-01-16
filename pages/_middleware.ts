import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from 'lit-jwt-verifier';

const streamMiddleware = async (req) => {
  const playbackId = req.page.params?.playbackId;
  const jwt = req.nextUrl.searchParams.get('jwt');
  const token = req.cookies['token'];

  if (jwt) {
    const { payload, verified } = await verifyJwt({ jwt });
    if (verified && payload.path === `/stream/${playbackId}`) {
      let res;
      if (token) {
        res = NextResponse.next();
      } else {
        res = NextResponse.redirect(`/stream/${playbackId}`);
      }
      res.cookie('token', jwt);
      return res;
    }
  }
  if (token) {
    const { payload, verified } = await verifyJwt({ jwt: token });
    if (verified && payload.path === `/stream/${playbackId}`) {
      const res = NextResponse.next();
      return res;
    }
  }
  return new Response(JSON.stringify({ error: "You don't meet the access criteria" }), {
    status: 403,
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
