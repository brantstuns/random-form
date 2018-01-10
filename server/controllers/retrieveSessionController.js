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
      }

      return res.status(200).json({ sessions: sessionIds });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};