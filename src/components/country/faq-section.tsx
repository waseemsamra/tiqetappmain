<AccordionTrigger className="text-lg hover:no-underline">
    <div className="flex items-center gap-4">
        <Image                                 
            src={item.image}                                   
            alt={item.question}                                   
            width={60}                                   
            height={60}                                   
            className="rounded-lg object-cover unoptimized"                                   
            data-ai-hint="attraction"                                 
        />
        <span className="text-left">{item.question}</span>
    </div>
</AccordionTrigger>
<AccordionContent className="text-muted-foreground text-base pl-20">
    {/* Your content here */}
</AccordionContent>