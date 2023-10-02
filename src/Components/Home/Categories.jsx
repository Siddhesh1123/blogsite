import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { categories } from "../../constants/data";
import { Link, useSearchParams } from "react-router-dom";

const CreateBlog = styled(Button)`
  background: #784ba0;
  font-size: 25px;
  margin-top: 20px;
  width: 396px;
  font-family: system-ui;
  border-radius: 0px;
  padding: 20px;
  color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  font-weight: 500;
`;

const StyleTable = styled(Table)`
  border: 1px solid rgba(224, 224, 224, 1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
`;
const Menu = styled(TableCell)`
  font-size: 20px;
  padding: 30px 10px;
  font-weight: 600; 
  
`;


export const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category')

  return (
    <>
      <Link to={`/create?category=${category || ''}}`}>
        <CreateBlog variant="contained">Create Blog</CreateBlog>
      </Link>
      <StyleTable>
        <TableHead>
          <TableRow>
            <Menu>
              <Link to="/" style={{ textDecoration: 'none',color: 'inherit'}}>All Categories</Link>
            </Menu>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map(category => (
            <TableRow key={category.id}>
              <Menu>
                <Link to={`/?category=${category.type}`} style={{ textDecoration: 'none',color: 'inherit'}}>{category.type}</Link>
              </Menu>
            </TableRow>
          ))}
        </TableBody>
      </StyleTable>
    </>
  );
};
