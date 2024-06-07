import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
  name: string;
  quote: string;
  image: string;
  role?: string;
}

const TestimonialCard: React.FC<Testimonial> = ({ name, quote, image, role }) => (
  <Card className="mx-2 dark:bg-slate-900">
    <CardHeader className="flex items-center">
      <Avatar className="w-16 h-16 mr-4">
        <AvatarImage src={image} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm text-muted-foreground">{role}</p>
        <p className="text-lg font-semibold">{name}</p>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground text-sm">
        &quot;{quote}&quot;
      </p>
    </CardContent>
  </Card>
);

export default TestimonialCard;
