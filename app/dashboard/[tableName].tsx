import { useRouter } from "next/router";
import TableView from "@/components/TableView";

export default function TablePage() {
  const router = useRouter();
  const { tableName } = router.query;

  if (!tableName) return <div>Loading...</div>;

  return (
    <div>
      <TableView tableName={tableName as string} />
    </div>
  );
}
