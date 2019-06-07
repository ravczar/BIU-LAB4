
import { people } from './data'; //-> import danych o osobach
import { Person } from "app/models/person";

export class PagingInfo {
    constructor(public page: number, public count: number) {
    }
}

export class PersonService {

    public getPeople(pagingInfo: PagingInfo): Array<Person> {

        let begin = pagingInfo.page - 1;
        if (begin < 0) begin = 0;

        return people
            .filter(p => p !== undefined)
            .slice(begin * pagingInfo.count,
                    begin * pagingInfo.count + pagingInfo.count)
            .map(x =>  new Person(
                    x.id,
                    x.firstName,
                    x.lastName,
                    x.gender,
                    x.age,
                    new Date(x.birthsday),
                    +x.income,
                    x.email
                )
            );
    }

    public getPeopleExceptSomeRecords(pagingInfo: PagingInfo, peopleToBeNotShown : Array<number>): Array<Person> {

        let begin = pagingInfo.page - 1;
        if (begin < 0) begin = 0;

        let group: Array <Person>= people
            .filter(p => p !== undefined)
            .slice(begin * pagingInfo.count,
                    begin * pagingInfo.count + pagingInfo.count)
            .map(x =>  new Person(
                    x.id,
                    x.firstName,
                    x.lastName,
                    x.gender,
                    x.age,
                    new Date(x.birthsday),
                    +x.income,
                    x.email
                )
            );

            peopleToBeNotShown.sort(sortNumber);
            function sortNumber(a, b) {
                return a - b;
            }

            for (let i=0; i < group.length; i++ ){    
            
                for (let j=0; j < peopleToBeNotShown.length; j++ ){
                    if( group[i].id == peopleToBeNotShown[j]){
                        //console.log("Kasujemyz grupy index: " + group[i].id + ".. Index Osoby do skasowania:" + peopleToBeNotShown[j] );
                        group.splice(group.indexOf(group[i]), 1);
                    }
                    
                }
            }
            //console.log("ZBIÓR SKASOWANYCH ELEMENTÓW OGÓŁEM: " + peopleToBeNotShown);
            return group; 
    }

    public removePerson(p: Person, currentPage: number): void {
        let personTBD = people.filter(person => person.id == p.id)[0].id;
        people.splice(people.indexOf(people.filter(person => person.id = p.id)[0]), 1)  // wyszukuje index osoby i kasuje 1 rekord
        console.log("Person tb-del=> Name:" + p.firstname + ' Surname: ' + p.lastname) ;
        console.log("Current page value is:" + currentPage + ". this.person index: "+ personTBD);
    }

}
    
var service = new PersonService();

//console.log(service.getPeople(new PagingInfo(1, 5)));
