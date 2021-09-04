// The user needs to sign in before
// This happens in the LoginModal
const [email, setEmail] = useState('')
const [submitted, setSubmitted] = useState(false)
async function signIn() {
  const { error, data } = await supabase.auth.signIn({
    email,
  })
  if (error) {
    console.log({ error })
  } else {
    setSubmitted(true)
  }
}

// Can check if a user is signed in
async function fetchProfile() {
  const [profile, setProfile] = useState(null)
  const profileData = await supabase.auth.user()
  if (!profileData) {
    router.push('/sign-in')
  } else {
    setProfile(profileData)
  }
}

// make an auth api request
/* pages/api/auth.js */
import { supabase } from '../../client'

export default function handler(req, res) {
  supabase.auth.api.setAuthCookie(req, res)
}
