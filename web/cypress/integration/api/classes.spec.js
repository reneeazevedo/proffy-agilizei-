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
                        "week_day": 0,
                        "from": "08:00",
                        "to": "09:00"
                    }
                ]
            }
        }).then((response) => {
            console.log(response)
        })
    });
});