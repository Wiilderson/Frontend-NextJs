/**
 * @api {get} /api/users Read list
 *
 * Resolva o exercício aqui:
 *
 * - Crie uma API que retorne uma lista de usuários
 * - A request deve receber apenas o método GET
 * - A lista deve conter pelo menos 2 usuários
 * - Cada usuário deve ter um id, nome e email
 * - Utilize a interface IUser para tipar os dados
 */

import { NextApiRequest, NextApiResponse } from 'next/types';

import { IUser } from '@/types/user.d';

export default (req: NextApiRequest, res: NextApiResponse) => {

	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Apenas método GET é permitido' });
	}

	// Lista de usuários
	const users: IUser[] = [
		{
			id: 1,
			name: 'John Doe',
			email: 'john.doe@example.com',
		},
		{
			id: 2,
			name: 'Jane Doe',
			email: 'jane.doe@example.com',
		},
	];

	// Retornar a lista de usuários
	return res.status(200).json(users);
}
