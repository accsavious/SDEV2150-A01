<<<<<<< HEAD
=======
// Two ways to ingest props as a functional component:
//   1. function takes one argument -> all props packed within an object, referred to as properties of that object
//        e.g. function Bio(person) { return <p>{person.name} is {person.age} years old.</p> }
//
//   2. function takes destructured arguments -> only extracts what you need
//        e.g. function Bio({ name, age }) { return <p>{name} is {age} years old.</p> }

>>>>>>> 533ef1136a146ce4cadcb35e943c4314dc40fcfa
export default function Header({ tagline }) {
  return (
    <header className="mb-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold text-sky-600">NAIT Resource Directory</h1>
          <p className="text-sm text-gray-500">
<<<<<<< HEAD
            {tagline ? tagline : 'Find student support services, labs, and campus resources.'}
=======
            {/* Conditional rendering:
                  - I can use a ternary ( condition ? ifTruthy : ifFalsey )
                  -Or, I can use the || operator outright ( condition || defaultValue ) */}
            { tagline || 'Find student support services, labs, and campus resources.'}
>>>>>>> 533ef1136a146ce4cadcb35e943c4314dc40fcfa
          </p>
        </div>
      </div>
    </header>
  );
}
