"use client"
import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import Button from '../Button/Button';

class CarouselComp extends Component {
    render() {
        return (
            <div className="w-auto h-auto">
            <Carousel autoPlay={true} swipeable={true}  showThumbs={false} infiniteLoop={true}>
                <div className=' bg-black'>
                    <Image src="/hero/hero_1.webp" width={1000} height={640} alt='carousel' className='w-auto h-auto max-h-[34rem] object-cover' />
<div className="content absolute left-1 md:left-3 lg:left-4 flex flex-col items-center justify-start gap-2 z-20">
<h1>Samsung 15 | Buy Your Happiness Now 🥰 </h1>
<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam laudantium labore a magni corporis eius dolorem hic vel. Ipsa nemo maiores</p>
<Button text={'Buy Now'} />

</div>
                </div>
                <div className=' bg-black'>
                    <Image src="/hero/hero_2.webp" width={1000} height={640} alt='carousel' className='w-auto h-auto max-h-[34rem] object-cover' />
<div className="content absolute left-1 md:left-3 lg:left-4 flex flex-col items-center justify-start gap-2 z-20">
<h1>Samsung 15 | Buy Your Happiness Now 🥰 </h1>
<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam laudantium labore a magni corporis eius dolorem hic vel. Ipsa nemo maiores</p>
<Button text={'Buy Now'} />

</div>
                </div>
                <div className=' bg-black'>
                    <Image src="/hero/hero_3.webp" width={1000} height={640} alt='carousel' className='w-auto h-auto max-h-[34rem] object-cover' />
<div className="content absolute left-1 md:left-3 lg:left-4 flex flex-col items-center justify-start gap-2 z-20">
<h1>Samsung 15 | Buy Your Happiness Now 🥰 </h1>
<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam laudantium labore a magni corporis eius dolorem hic vel. Ipsa nemo maiores</p>
<Button text={'Buy Now'} />

</div>
                </div>
                <div className=' bg-black'>
                    <Image src="/hero/hero_4.webp" width={1000} height={640} alt='carousel' className='w-auto h-auto max-h-[34rem] object-cover' />
<div className="content absolute left-1 md:left-3 lg:left-4 flex flex-col items-center justify-start gap-2 z-20">
<h1>Samsung 15 | Buy Your Happiness Now 🥰 </h1>
<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam laudantium labore a magni corporis eius dolorem hic vel. Ipsa nemo maiores</p>
<Button text={'Buy Now'} />
</div>
                </div>
            </Carousel>
            </div>
        );
    }
}

export default CarouselComp