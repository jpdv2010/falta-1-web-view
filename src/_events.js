import { CNavItem } from '@coreui/react'

const _events = [
    {
      id: 1,
      component: CNavItem,
      name: "Racha 12/06",
      description: 'Racha dos bests que vai ser realizado dia 12/06',
      date: "12/06/2022",
      amountVacancies: 6,
      participants: [
        { name: "Jozé da Silva" },
        { name: "Joãozinho"},
        { name: "Gabriel" },
        { name: "Guilherme" },
        { name: "João" }
      ],
      address: {
        city: "Uberlandia",
        street: "Rua A",
        number: 434,
        district: "Santa Monica",
        zipCode: "3400560",
        complemento: ""
      }
    },
    {
      id: 2,
      component: CNavItem,
      name: "Racha dos amigos",
      date: "20/06/2022",
      amountVacancies: 10,
      participants: [
        { name: "João" },
        { name: "Thomaz" },
        { name: "Luizote" },
        { name: "Goleiro" }
      ],
      address: {
        city: "Uberaba",
        street: "Rua 1",
        number: 555,
        district: "Santa Monica",
        zipCode: "3400560",
        complemento: ""
      }
    },
    {
      id: 3,
      component: CNavItem,
      name: "Sem idéia",
      date: "15/07/2022",
      amountVacancies: 12,
      participants: [
        { name: "Perna de Pau"},
        { name: "Ruim" },
        { name: "Gandula" },
        { name: "Goleiro" }
      ],
      address: {
        city: "Patrocinio",
        street: "Rua Principal",
        number: 4656,
        district: "Santa Monica",
        zipCode: "3400560",
        complemento: ""
      }
    }
  ]
  
  export default _events