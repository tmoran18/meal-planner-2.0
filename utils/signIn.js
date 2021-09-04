import { supabase } from '../utils/supabaseClient'

export default async function signIn(req, res) {
  const { email, password } = req.body
  let { user, error } = await supabase.auth.signIn({
    email: email,
    password: password,
  })
  if (error) return res.status(401).json({ error: error.message })
  supabase.auth.api.setAuthCookie(req, res)
}
