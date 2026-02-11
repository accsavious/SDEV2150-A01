// components
import ResultsItem from './ResultsItem';

// data
import { resources } from '../data/resources';

export default function Results() {
  return (
    <section className="h-full mb-4">
      <div className="h-full rounded border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <strong className="text-sm text-gray-900">Results</strong>
          <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-semibold text-gray-700">
            4
          </span>
        </div>

        {/* Replaced static/hardcoded JSX with our ResultsItem component, generated from our data */}
        <ul className="divide-y divide-gray-200">
          {
            resources.map(
              (r) => (
                <ResultsItem
                  key={r.id}
                  title={r.title}
                  category={r.category}
                  summary={r.summary}
                  location={r.location}
                >
                  {/* I'm not going to self-terminate this component, because I'll be adding an example of component children */}
                </ResultsItem>
              )
            )
          }
        </ul>
      </div>
    </section>
  );
}