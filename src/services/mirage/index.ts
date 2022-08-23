import { createServer, Factory, Model } from 'miragejs';
import faker from 'faker';

type User = {
    name: string;
    email: string;
    created_at: string;
};

export function makeServer() {
    const server = createServer({
        models: {
            user: Model.extend<Partial<User>>({}),
        },
        factories: {
            user: Factory.extend({
                name(i: number) {
                    return `User ${i + 1}`;
                },
                email() {
                    return faker.internet.email().toLowerCase();
                },
                createdAt() {
                    return faker.date.recent(10);
                },
            }),
        },
        seeds(server) {
            server.createList('user', 10);
        },
        routes() {
            this.namespace = 'api';
            this.timing = 750; // tempo de respostas da api

            this.get('/users');
            this.post('/users');

            this.namespace = ''; // depois de criar as rotas ele reseta o namespace api para não prejudicar as api routes do nextjs
            this.passthrough(); // definir quando utilizar nextjs, assim se o miragejs não encontrar a rota e repassas para frente
        },
    });
    return server;
}
