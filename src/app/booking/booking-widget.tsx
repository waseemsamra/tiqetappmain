
'use client';

import { useState, useMemo, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { add, format } from 'date-fns';
import { Calendar as CalendarIcon, Info, ChevronLeft, ChevronRight, Clock, Minus, Plus, Users } from 'lucide-react';

import type { Excursion } from '@/types';
import { Button } from '@/components/ui/button';
import { Calendar, type CalendarProps } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert } from '@/components/ui/alert';

const timeSlots = [
  '09:30', '10:00', '10:30', '11:30', '12:30', '13:00', '13:30', '14:00', 
  '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', 
  '18:30', '19:00'
];

const DayWithPrice = ({ 
    date, 
    excursion, 
    onSelect,
    selected 
}: { 
    date: Date; 
    excursion: Excursion; 
    onSelect: (date: Date) => void;
    selected: Date | undefined;
}) => {
    const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
    const isSelected = selected ? format(date, 'yyyy-MM-dd') === format(selected, 'yyyy-MM-dd') : false;

    return (
        <div 
            onClick={() => onSelect(date)}
            className={cn(
                "flex flex-col items-center justify-center p-1 rounded-md text-center h-16 w-16 cursor-pointer hover:bg-muted",
                isToday && "border border-primary",
                isSelected && "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
        >
            <div className="text-sm">{format(date, 'd')}</div>
             <div className={cn("text-xs mt-1", isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
                  €{Number(excursion.price || 0).toFixed(2)}
             </div>
        </div>
    );
}


export function BookingWidget({ excursion }: { excursion: Excursion }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const { toast } = useToast();
    
    const handleNextStep = () => {
        if (!selectedDate) {
            toast({ variant: 'destructive', title: 'Please select a date.' });
            return;
        }
        if (!selectedTime) {
            toast({ variant: 'destructive', title: 'Please select a time slot.' });
            return;
        }
        if (quantity === 0) {
            toast({ variant: 'destructive', title: 'Please select at least one ticket.' });
            return;
        }

        const dateWithTime = new Date(selectedDate);
        const [hours, minutes] = selectedTime.split(':').map(Number);
        dateWithTime.setHours(hours, minutes);

        const params = new URLSearchParams({
            activityId: excursion.id,
            date: dateWithTime.toISOString(),
            quantity: quantity.toString(),
        });
        
        startTransition(() => {
            router.push(`/details?${params.toString()}`);
        });
    };

     const totalPrice = useMemo(() => {
         return Number((excursion.price || 0) * quantity);
     }, [excursion.price, quantity]);
    
    const DayWithPriceComponent = (props: { date: Date }) => (
        <DayWithPrice {...props} excursion={excursion} onSelect={setSelectedDate} selected={selectedDate} />
    );

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                       <div>
                           <CardTitle>{excursion.name}</CardTitle>
                           <CardDescription>Show more info <Info className="inline h-3 w-3" /></CardDescription>
                       </div>
                         {excursion.images && excursion.images[0] && excursion.images[0].length > 0 && (
                           <Image src={excursion.images[0]} alt={excursion.name} width={80} height={60} className="rounded-lg object-cover" data-ai-hint="attraction" unoptimized />
                         )}
                    </CardHeader>
                </Card>

                <Card>
                     <CardHeader>
                        <CardTitle>When will you visit?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            month={currentMonth}
                            onMonthChange={setCurrentMonth}
                            components={{ Day: DayWithPriceComponent }}
                            className="p-0"
                            classNames={{
                                head_cell: "w-16",
                                cell: "p-0",
                                day: "h-16 w-16"
                            }}
                            disabled={{ before: new Date() }}
                        />
                         <div className="text-right text-xs text-muted-foreground mt-2">Prices may be rounded</div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Which time?</CardTitle>
                        <CardDescription>Keep in mind you need to arrive 30 minutes before start.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                           {timeSlots.map(time => (
                               <Button
                                  key={time}
                                  variant={selectedTime === time ? 'default' : 'outline'}
                                  onClick={() => setSelectedTime(time)}
                               >
                                   {time}
                               </Button>
                           ))}
                        </div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Select your tickets</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                             <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Child tickets (Age 0-3) are free and can be picked up at the venue (ID required).</li>
                                <li>Tickets are free of charge for People of Determination + one caregiver.</li>
                            </ul>
                        </Alert>
                        
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                           <div>
                                <p className="font-semibold">Entry ticket</p>
                                <p className="text-sm text-muted-foreground">Age: 4-99</p>
                                 <p className="font-bold mt-1">€{Number(excursion.price || 0).toFixed(2)}</p>
                           </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => setQuantity(q => Math.max(0, q - 1))}
                                    disabled={quantity === 0}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="text-lg font-bold w-10 text-center">{quantity}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => setQuantity(q => q + 1)}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                    </CardContent>
                </Card>
            </div>
            
            <div className="lg:col-span-1">
                 <Card className="sticky top-24">
                     <CardHeader className="p-0">
                      <div className="relative aspect-video">
                           {excursion.images && excursion.images[0] && excursion.images[0].length > 0 && (
                             <Image src={excursion.images[0]} alt={excursion.name} fill className="object-cover rounded-t-lg" data-ai-hint="attraction" unoptimized />
                           )}
                      </div>
                     </CardHeader>
                     <CardContent className="p-6 space-y-4">
                        <h3 className="font-bold text-lg">{excursion.name}</h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                             <p className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4" /> 
                                {selectedDate ? format(selectedDate, 'cccc, d MMMM yyyy') : 'No date selected'}
                            </p>
                             <p className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {selectedTime || 'No timeslot selected'}
                            </p>
                            {quantity > 0 && (
                                 <p className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    {quantity} Ticket(s)
                                </p>
                            )}
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                            <span>Price</span>
                            <span>{quantity > 0 ? `€${totalPrice.toFixed(2)}` : '€--.--'}</span>
                        </div>
                     </CardContent>
                     <CardFooter>
                         <div className="w-full">
                            <Separator />
                            <div className="flex justify-between items-center font-bold text-lg pt-4">
                                <span>Total price</span>
<span>{quantity > 0 ? `€${totalPrice.toFixed(2)}` : '€--.--'}</span>
                            </div>
                            <Button size="lg" className="w-full mt-4 bg-purple-600 hover:bg-purple-700" onClick={handleNextStep} disabled={isPending}>
                                Go to the next step
                            </Button>
                        </div>
                    </CardFooter>
                 </Card>
            </div>
        </div>
    );
}
