import { Link, usePage } from "@inertiajs/react";
import { Home } from "lucide-react";

/**
 * A component to generate a breadcrumb
 * from the current URL.
 *
 * It splits the URL into segments
 * and builds a breadcrumb path
 * for easy navigation display.
 *
 * @returns
 */
export default function Breadcrumb({ overrides = {} }) {
  const { url } = usePage(); // current URL like "/users/12/edit?page=2"

  // Remove query parameters before splitting
  const pathWithoutQuery = url.split("?")[0];
  const segments = pathWithoutQuery.split("/").filter(Boolean); // ['users', '12', 'edit']

  // Build breadcrumb path
  let path = "";
  const items = segments.map((segment, index) => {
    path += `/${segment}`;

    // Use override label or format segment
    const label = overrides[segment] || formatLabel(segment);
    const href = index < segments.length - 1 ? path : null;

    return { label, href };
  });

  return (
    <nav
      className="text-sm text-gray-600 flex items-center"
      aria-label="Breadcrumb"
    >
      <ol className="list-none inline-flex  space-x-2">
        <li>
          <Link href="/" className="text-sky-600 hover:underline">
            <span>
              <Home className="size-4" />
            </span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span>/</span>
            {item.href ? (
              <Link href={item.href} className="text-sky-600 hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-500">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function formatLabel(str) {
  // Remove ID numbers and replace dashes/underscores
  if (!isNaN(str)) return `#${str}`;
  return str.replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}
