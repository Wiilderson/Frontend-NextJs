/**
 * @api {get} /api/users/create Create User
 *
 * Resolva o exercício aqui:
 *
 * - Crie uma API que registre um usuário no array users
 * - A request deve receber apenas o método POST
 * - A request deve receber um body com os dados do usuário
 * - O body vai seguir a interface IUserCreate, removendo o id
 * - Você deve corrigir a interface IUserCreate em src/types/user.d.ts
 */

import { NextApiRequest, NextApiResponse } from 'next/types';

import { IUser, IUserCreate } from '@/types/user.d';
import { v4 as uuidv4 } from 'uuid';

const users: IUser[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {

	if (req.method === 'POST') {
		const { name, email }: IUserCreate = req.body;

		if (!name || !email) {
			return res.status(400).json({ message: 'Faltando campos obrigatórios' });
		}

		const newUser: IUser = {
			id: uuidv4(),
			name,
			email,
		};

		users.push(newUser);
		return res.status(201).json(users);
	} else {
		return res.status(405).json({ message: 'Método não permitido' });
	}
}