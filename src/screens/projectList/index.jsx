import react from 'react'
import { useState, useEffect } from 'react'
import { Search } from './search'
import { Tablelist } from './list'
import { cleanObject } from 'utils/index'
import * as qs from 'qs'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
	const [users, setUsers] = useState([])
	const [param, setParam] = useState({
		name: '',
		personId: '',
	})
	const [list, setList] = useState([])

	useEffect(() => {
		fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(
			async (res) => {
				if (res.ok) {
					setList(await res.json())
				}
			}
		)
	}, [param])

	useEffect(() => {
		fetch(`${apiUrl}/users`).then(async (res) => {
			if (res.ok) {
				setUsers(await res.json())
			}
		})
	}, [])

	return (
		<div>
			<Search users={users} param={param} setParam={setParam}></Search>
			<Tablelist users={users} list={list}></Tablelist>
		</div>
	)
}
