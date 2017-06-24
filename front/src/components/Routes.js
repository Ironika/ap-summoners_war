import App from 'components/App'
import Home from 'components/home/Home'
import Profile from 'components/profile/Profile'
import Monsters from 'components/monsters/Monsters'
import Runes from 'components/runes/Runes'
import Import from 'components/import/Import'
import Builds from 'components/builds/Builds'

let appRoutes = [
	{  component: Home },
	{  path: '/profile', component: Profile },
	{  path: '/monsters', component: Monsters },
	{  path: '/runes', component: Runes },
	{  path: '/import', component: Import },
	{  path: '/builds', component: Builds },
]
let routes = [
	{ path: '/', component: App, routes: appRoutes },
]
export default routes
