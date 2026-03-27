
import { useState } from 'react';

// our custom hooks
import { useResources } from '../src/hooks/useResources';

// our components
import Card from '../src/components/ui/Card';


const EXAMPLE_RESOURCE = {
  title: 'Study Group',
  category: 'Wellness',
  summary: 'Studying in a group (of people).',
  location: 'NAIT Campus',
  hours: 'Mon-Fri 08:00-13:00',
  virtual: false,
  openNow: false,
};

const resetForm = {
  title: '',
  category: '',
  summary: '',
  location: '',
  hours: '',
  contact: '',
  virtual: false,
  openNow: false,
};


export default function AdminPage() {

  const { resources, isLoading, error, refetch } = useResources();

  const [formData, setFormData] = useState(EXAMPLE_RESOURCE);

  async function createResource(e) {
    e.preventDefault();
    const res = await fetch(
      'http://localhost:3000/resources',
      { method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      }
    );
    if (!res.ok) {
      throw new Error('Error creating resource.');
    }
    refetch();
  }


  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Admin</h1>
        <p className="text-sm text-base-content/70">
          Manage student resources.
        </p>
      </div>

      <section className="md:col-span-3 lg:col-span-3">
        <Card title="Resource Form">
          <div className="card-body">
            <form id="frm-add-resource" className="space-y-4">

              <div className="space-y-1">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  placeholder="Resource title"
                  value= {formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  placeholder="Resource category"
                  value= {formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  {['Academic', 'Wellness', 'Financial', 'Tech'].map(
                    (label) => { 
                      return <option value={label} key={label}>{label}</option>;
                    }
                  )}
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  placeholder="Resource location"
                  value= {formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="hours" className="block text-sm font-medium text-gray-700">
                  Hours
                </label>
                <input
                  id="hours"
                  type="text"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  placeholder="Resource hours (e.g. Mon-Fri 08:00-13:00)"
                  value= {formData.hours}
                  onChange={(e) => setFormData({...formData, hours: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                  Contact
                </label>
                <input
                  id="contact"
                  type="text"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  placeholder="Resource contact (e.g. email@nait.ca)"
                  value= {formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                />
              </div>

              <div className="flex gap-6">
                <div className="space-y-1">
                  <label htmlFor="virtual" className="block text-sm font-medium text-gray-700">
                    Virtual (online-only)
                  </label>
                  <input
                    id="virtual"
                    type="checkbox"
                    className="rounded border border-gray-300 text-sm"
                    value= {formData.virtual}
                  onChange={(e) => setFormData({...formData, virtual: e.target.value})}
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="open-now" className="block text-sm font-medium text-gray-700">
                    Open Now
                  </label>
                  <input
                    id="open-now"
                    type="checkbox"
                    className="rounded border border-gray-300 text-sm"
                    value= {formData.openNow}
                  onChange={(e) => setFormData({...formData, openNow: e.target.value})}
                  />
                </div>
              </div>

              <hr className="border-gray-200" />

              <div className="flex gap-2">
                <button
                  type="reset"
                  className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  onClick={() => setFormData(resetForm)}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                  onClick={(e) => createResource(e)}
                >
                  Add Resource
                </button>
              </div>
            </form>
          </div>
        </Card>
      </section>

      <section className="md:col-span-3 lg:col-span-3">
        <Card title="Current Resources">
          <div className="card-body">
            {isLoading && <p>Loading resources...</p>}

            {error && (
              <div className="alert alert-error">
                <span>{error.message}</span>
                <button className="btn btn-sm" onClick={refetch}>Try again</button>
              </div>
            )}
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.id} className="rounded border border-gray-200 p-3">
                  <p className="font-semibold">{resource.title}</p>
                  <p className="text-sm text-base-content/70">{resource.category}</p>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>
    </>
  );
}