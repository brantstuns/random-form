module.exports = redis => async (req, res) => {
  const { session, user } = req.params;
  try {
    if (session) {
      const state = await redis.hget(user, session);
      redis.expire(user, 60 * 60 * 24 * 45);
      return res.status(200).json(JSON.parse(state));
    } else {
      const sessionIds = await redis.hkeys(user);
      redis.expire(user, 60 * 60 * 24 * 45);

      if (sessionIds.length === 1) {
        const state = await redis.hget(user, sessionIds[0]);
        return res.status(200).json(JSON.parse(state));
      } else {
        const sessionInfo = await Promise.all(sessionIds.map(async (session, idx) => {
          const sessionState = JSON.parse(await redis.hget(user, sessionIds[idx]));
          return {
            sessionId: session,
            timeStamp: sessionState.timeStamp,
            completed: sessionState.completed
          }
        }));
        console.log(sessionInfo);
        return res.status(200).json({ sessions: sessionInfo });
      }

    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};