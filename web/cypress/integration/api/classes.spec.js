/// <reference types="cypress"/>
/// <reference types="@bahmutov/cy-api"/>



context('Classes endpoint', () => {
    it('POST - Cadastrar um novo professor', () => {

        cy.api({
            method: 'POST',
            url: `${Cypress.config().apiUrl}/classes`,
            body: {
                "name": "Agilizei Prof",
                "avatar": "https://pickaface.net/gallery/avatar/unr_fake_190524_1549_9fgji7.png",
                "whatsapp": "51999999999",
                "bio": "Lorem Ipsum Lorem Ipsum",
                "subject": "Química",
                "cost": 1000,
                "schedule": [
                    {
                        "week_day": 1,
                        "from": "08:00",
                        "to": "09:00"
                    }
                ]
            }
        }).then((response) => {
            //Validação atributo class_id não é nulo
            expect(response.body[0]).to.have.property('class_id').not.null
            //Validação para verificar se o dia da semana igual a 1
            expect(response.body[0]).to.have.property('week_day',1)
            //Validação para o horario de inicio da aula
            expect(response.body[0]).to.have.property('from',480)
            //Validação para o horario de fim da aula
            expect(response.body[0]).to.have.property('to',540)
            //Validação se o body do response possui tamanho igual 1
            expect(response.body).to.have.length('1')
            //Verificar se o atributo connetion foi definida como keep-alive no header da requisição
            expect(response.headers.connection).to.be.equal('keep-alive')
            //Verificar se o atributo keep-alive foi definido com o timeout = 5 segundos
            expect(response.headers).to.have.property('keep-alive', 'timeout=5')
            //Verificar se o headers possui o atributo content-type definido como 'application/json; charset=utf-8'
            expect(response.headers)
            .to.have.property('content-type')
            .equal('application/json; charset=utf-8')
            //Validação status code 201
            expect(response.status).to.equal(201)
            //Validação statusText é igual Created
            expect(response.statusText).to.equal('Created')
            //Validação para a duração da reposta seja < 30 segundos
            expect(response.duration).lessThan(30)
            
            
        })
    });
});