import { Database } from './database.js';
import { randomUUID } from "node:crypto"
import { buildRoutePath } from './utils/build-route-path.js';
import { title } from 'node:process';
import path from 'node:path';

const database = new Database()


export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query
            const task = database.select('tasks', search ? {
                title: search,
                description: search
            } : null)

            return res.end(JSON.stringify(task))

        }

    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const{ title, description } = req.body

            const task = {
                id: randomUUID(),
                title,
                description,
                created_at: new Date(),
                updated_at: null,
                completed_at: null,
            }
            database.insert('tasks', task)

            return res.writeHead(201).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params
            
            database.delete('tasks', id)

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const{ title, description } = req.body

            database.update('tasks', id, {
                title,
                description,
            })

            return res.writeHead(204).end()
        }
    },

    {
        method: 'PATCH',
        path: buildRoutePath('/task/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const { completed_at } = req.body
            database.patch('tasks', id, {
                completed_at,
            })

            return res.writeHead(204).end()

        }
    }
]