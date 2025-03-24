import { Link } from "react-router-dom"
import { Card, CardBody, CardTitle, CardText } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const CategoryCard = ({ category }) => {
  return (
    <Card className="category-card shadow-sm h-100">
      <CardBody className="text-center">
        <div className="category-icon mb-3">
          <FontAwesomeIcon icon={category.icon} size="2x" />
        </div>
        <CardTitle tag="h5">{category.name}</CardTitle>
        <CardText className="text-muted">{category.jobCount} jobs available</CardText>
        <Link
          to={`/jobs?category=${category.slug}`}
          className="stretched-link"
          aria-label={`Browse ${category.name} jobs`}
        />
      </CardBody>
    </Card>
  )
}

export default CategoryCard

