import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Testimonial } from "@prisma/client";



const TestimonialCard = ({testimonial}:{testimonial:Testimonial}) => (
  <Card className="mx-2 dark:bg-slate-900">
    <CardHeader className="flex items-center">
      <Avatar className="w-16 h-16 mr-4">
        <AvatarImage src={testimonial.UserImage} />
        <AvatarFallback>{testimonial.userName}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm text-muted-foreground">{testimonial.designation}</p>
        <p className="text-lg font-semibold">{testimonial.userName}</p>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground text-sm">
        &quot;{testimonial.message}&quot;
      </p>
    </CardContent>
  </Card>
);

export default TestimonialCard;
