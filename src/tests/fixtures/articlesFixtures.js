import moment from 'moment';

const articles = [{
        createdAt: moment(0).format('D. M. Y'),
        id: '1',
        title: 'Breaking news',
        text: 'Political info'
    },{
        createdAt: moment(0).subtract(4, 'days').format('D. M. Y'),
        id: '2',
        title: 'New graphene chips',
        text: 'Are going to conqver world'
    },{
        createdAt: moment(0).add(4, 'days').format('D. M. Y'),
        id: '3',
        title: 'New hydrogen revolution?',
        text: 'Hydrogen powered ship is going to sail'
    }
];

export default articles;