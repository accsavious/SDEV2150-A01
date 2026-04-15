import { NavLink, useNavigate, useParams } from 'react-router';

import { Form, useLoaderData, useNavigation } from 'react-router';
import Card from '../components/ui/Card';
import ResourceForm from '../components/ResourceForm';

// Now that the form has been moved into its own component, we can define a constant
// for the default form data.
const EMPTY_FORM_DATA = {
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

  const navigate = useNavigate();
  const navigation = useNavigation();
  const { resources, selectedResource, resourceId} = useLoaderData();
  const isSubmitting = navigation.state === 'submitting';
  // We no longer require a useEffect to track the current resource. Instead, we 
  // can derive it directly from the URL param and the list of resources. If the 
  // resourceId param is present, we find the corresponding resource from the list.
  // If it's not present, currentResource will be null, which indicates that we're
  // creating a new resource rather than editing an existing one.

  // Track the current resource based on the URL param. If no resourceId is present, 
  // currentResource will be null..
  const currentResource = resourceId
    ? resources.find((item) => item.id === resourceId)
    : null;

  // Set the initial form data based on the current resource. If it's not null, use 
  // the resource's data. Otherwise, use the empty form data.
  const initialFormData = currentResource ? {
    title: currentResource.title,
    category: currentResource.category,
    summary: currentResource.summary,
    location: currentResource.location,
    hours: currentResource.hours,
    contact: currentResource.contact,
    virtual: currentResource.virtual,
    openNow: currentResource.openNow,
  } : EMPTY_FORM_DATA;


  async function handleCreateResource(e, formData) {
    e.preventDefault();
    e.preventDefault();

    const isEditing = Boolean(resourceId);
    const url = isEditing
      ? `http://localhost:3000/resources/${resourceId}`
      : 'http://localhost:3000/resources';

    const method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error(`Could not ${isEditing ? 'update' : 'create'} resource`);
    }

    const savedResource = await res.json();
    await refetch();

    navigate(`/admin/${savedResource.id}`);
  }

  // Determine if we're in editing mode based on the presence of the resourceId param.
  const isEditing = Boolean(resourceId);

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
            {/* Update to make use of the ResourceForm component */}
            {!resourceId || currentResource ? (
              <ResourceForm
                key={resourceId ?? 'new'}
                initialData={initialFormData}
                isEditing={isEditing}
                onSubmit={handleCreateResource}
                onReset={() => navigate('/admin')}
              />
            ) 
            : 
            (<div>Resources not loaded</div>)
            }
          </div>
        </Card>
      </section>

      <section className="md:col-span-3 lg:col-span-3">
        <Card title="Current Resources">
          <div className="card-body">
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li
                  key={resource.id}
                  >
                  <NavLink 
                    to={`/admin/${resource.id}`}
                    className={({ isActive }) => 
                      `block rounded border p-3 
                      ${isActive ? 
                          'border-sky-500 bg-sky-50' 
                        : 
                          'border-gray-200'
                      }
                      `
                    }
                  >
                  <p className="font-semibold">{resource.title}</p>
                  <p className="text-sm text-base-content/70">{resource.category}</p>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>
    </>
  );
};