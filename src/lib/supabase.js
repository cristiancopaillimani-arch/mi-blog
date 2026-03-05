import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qfjgidkawwfekphrdqik.supabase.co'
const supabaseKey = 'sb_publishable_Nb2FaK73GsLKb0N4Wfz-LA_eEkh0B5U'

export const supabase = createClient(supabaseUrl, supabaseKey)