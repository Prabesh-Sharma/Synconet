import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'
import slugify from 'slugify'
import { PlusIcon } from 'lucide-react'

const Events = () => {
	const navigate = useNavigate()
	const eventName = 'Annual Tech Event'
	const slug = slugify(eventName, { lower: true })

	return (
		<Layout>
			<Layout.Header>
				<h1 className="text-4xl text-neutral-200">Events</h1>
			</Layout.Header>
			<Layout.Main>
				<div className="p-4 relative">
					<button
						className="bg-slate-200 rounded-lg p-1 hover:bg-slate-400 text-black"
						onClick={() => navigate(`/home/events/event/${slug}`)}
					>
						click me
					</button>
					<button
						className="flex flex-row absolute right-2 top-2 rounded-md border-2 py-1 px-2 
                         bg-neutral-500/20 border-neutral-400 hover:text-neutral-100 hover:border-neutral-100"
						type="submit"
						onClick={() => navigate('/home/events/addevent')}
					>
						<PlusIcon />
						<div>Add Event</div>
					</button>
				</div>
			</Layout.Main>
		</Layout>
	)
}

export default Events
